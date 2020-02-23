async method ({commit}, payload) {
	commit('clearError')
	commit('setLoading', true);
	// Когда с сервера придет ответ мы меняем значения переменных
	try{
		// останавливаем загрузку
		commit('setLoading', false)
	} catch (error) {
		// останавливаем загрузку - когда поймали ошибку
		commit('setLoading', false);
		commit('setError', error.message);
		// выкидываем ошибку
		throw error;
	}
}