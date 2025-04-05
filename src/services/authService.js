import { supabase } from './supabaseClient.js';

/**
 * Autentica um usuário com email e senha
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise} Promise com os dados do usuário logado
 */
export const authenticate = async (email, password) => {
  try {
    // Tenta fazer login
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) throw new Error(authError.message);

    // Busca os dados do usuário usando a função segura
    const { data: userData, error: userError } = await supabase
      .rpc('get_my_user');

    if (userError) throw new Error(userError.message);
    
    // Busca os papéis do usuário
    const { data: rolesData, error: rolesError } = await supabase
      .rpc('get_my_roles');

    if (rolesError) throw new Error(rolesError.message);

    // Verifica se o usuário é um aluno (tem o papel Aluno)
    const isAluno = rolesData.some(role => role.nome === 'Aluno');
    
    // Se for aluno, busca dados específicos de aluno
    let alunoData = null;
    if (isAluno) {
      const { data: aluno, error: alunoError } = await supabase
        .from('alunos')
        .select('*')
        .eq('id', userData[0].id)
        .maybeSingle();
        
      if (!alunoError && aluno) {
        alunoData = aluno;
      }
    }

    // Retorna os dados do usuário
    return {
      ...userData[0],
      papeis: rolesData,
      // Se for aluno, adiciona os dados de aluno
      ...(alunoData && { aluno: alunoData })
    };
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    throw new Error(error.message || 'Erro ao fazer login');
  }
};

/**
 * Registra um novo usuário
 * @param {Object} userData - Dados do usuário
 * @returns {Promise} Promise com os dados do usuário registrado
 */
export const registerUser = async (userData) => {
  try {
    // Registra o usuário no auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          full_name: userData.nome
        }
      }
    });

    if (authError) throw new Error(authError.message);

    // O trigger no Supabase já cria automaticamente o usuário e atribui o papel de aluno
    // Apenas aguardamos um pouco para garantir que o trigger foi executado
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Busca o usuário criado
    const { data: newUser, error: userError } = await supabase
      .rpc('get_my_user');

    if (userError) throw new Error(userError.message);

    return newUser[0];
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    throw new Error(error.message || 'Erro ao registrar usuário');
  }
};

/**
 * Faz logout do usuário atual
 * @returns {Promise} Promise indicando sucesso
 */
export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    return true;
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw new Error(error.message || 'Erro ao fazer logout');
  }
};

/**
 * Verifica se existe uma sessão ativa
 * @returns {Promise} Promise com os dados da sessão se existir
 */
export const getCurrentSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw new Error(error.message);
    return data.session;
  } catch (error) {
    console.error('Erro ao verificar sessão:', error);
    return null;
  }
};

/**
 * Busca os dados do usuário atual
 * @returns {Promise} Promise com os dados do usuário
 */
export const getCurrentUser = async () => {
  try {
    const session = await getCurrentSession();
    if (!session) return null;

    // Busca os dados do usuário usando a função segura
    const { data: userData, error: userError } = await supabase
      .rpc('get_my_user');

    if (userError) throw new Error(userError.message);
    
    // Busca os papéis do usuário
    const { data: rolesData, error: rolesError } = await supabase
      .rpc('get_my_roles');

    if (rolesError) throw new Error(rolesError.message);

    // Verifica se o usuário é um aluno (tem o papel Aluno)
    const isAluno = rolesData.some(role => role.nome === 'Aluno');
    
    // Se for aluno, busca dados específicos de aluno
    let alunoData = null;
    if (isAluno) {
      const { data: aluno, error: alunoError } = await supabase
        .from('alunos')
        .select('*')
        .eq('id', userData[0].id)
        .maybeSingle();
        
      if (!alunoError && aluno) {
        alunoData = aluno;
      }
    }

    // Retorna os dados do usuário
    return {
      ...userData[0],
      papeis: rolesData,
      // Se for aluno, adiciona os dados de aluno
      ...(alunoData && { aluno: alunoData })
    };
  } catch (error) {
    console.error('Erro ao buscar usuário atual:', error);
    return null;
  }
};

/**
 * Verifica se o usuário atual tem um determinado papel
 * @param {string} papelNome - Nome do papel a verificar
 * @returns {Promise<boolean>} Promise com o resultado da verificação
 */
export const hasRole = async (papelNome) => {
  try {
    const { data, error } = await supabase.rpc('user_has_role', {
      role_name: papelNome
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao verificar papel do usuário:', error);
    return false;
  }
};

/**
 * Recupera o maior nível de acesso do usuário atual
 * @returns {Promise<number>} Promise com o nível de acesso ou 0 se não estiver logado
 */
export const getUserAccessLevel = async () => {
  try {
    const { data, error } = await supabase.rpc('get_user_access_level');
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao buscar nível de acesso do usuário:', error);
    return 0;
  }
};

export default {
  authenticate,
  registerUser,
  logout,
  getCurrentSession,
  getCurrentUser,
  hasRole,
  getUserAccessLevel
};