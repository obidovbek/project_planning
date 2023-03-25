const url = "http://localhost:5000/"; //asosiy

export const environment = {
  production: true,
  apiUrl: "http://localhost:5000",
  http: {
    post_project:{
      path: url + 'posts/'
    },
    get_projects:{
      path: url + 'projects/'
    },
    login:{
      path: url + 'auth/login/'
    },
    autologin:{
      path: url + 'users/autologin/'
    }
  }
  // apiUrl: "https://apitt.ferpi.uz",
};
