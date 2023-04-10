// const url = "http://localhost:5000/"; //asosiy
const url = "https://tiilapi.ferpi.uz/"; //asosiy

export const environment = {
  production: true,
  // apiUrl: "http://localhost:5000",
  // apiUrl: "http://localhost:5000",
  http: {
    post_project:{
      path: url + 'posts/'
    },
    review_project:{
      path: url + 'posts/review/'
    },
    get_file:{
      path: url + 'posts/file/'
    },
    get_one_project:{
      path: url + 'posts/getOne/'
    },
    get_projects:{
      path: url + 'posts/getWithCount/'
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
