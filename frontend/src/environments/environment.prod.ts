const url = "http://localhost:3000/"; //asosiy

export const environment = {
  production: true,
  apiUrl: "http://localhost:3000",
  http: {
    post_project:{
      path: url + 'projects/'
    },
    get_projects:{
      path: url + 'projects/'
    }
  }
  // apiUrl: "https://apitt.ferpi.uz",
};
