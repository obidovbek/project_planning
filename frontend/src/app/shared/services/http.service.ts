import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { DataService } from 'src/app/shared/services/data.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private authService: AuthService,
    ) { }

  getTimetable = () => {
    this.dataService.startLoading();
    return new Promise((resolve, reject) => {
        this.http.post(environment.http.getTimetable.path, 
            { 
              a: environment.h_a,
              name: this.dataService.name,
              // curriculum: this.dataService.curriculum2
            }
        ).subscribe((result:any)=>{
          //  console.log('getTimetable', atob(result.data))

          // const ungzipedData = ungzip();
            if (result.status === 200) {

                this.getTimetableSecHalf().then(res=>{
                  this.dataService.areas = result.areas;
                  // this.dataService.rooms = result.rooms
                  // this.dataService.groups = result.groups;
                  // this.dataService.curriculum = result.curriculum;
                  this.dataService.streams = result.streams;
                  this.dataService.teachers = result.teachers;
                  localStorage.setItem("curriculum", JSON.stringify(result.curriculum));
                  this.dataService.subjects = result.subjects;
                  this.dataService.subjects.map((res:any)=>{res.name = res.subjectName;});
                  this.dataService.loading = false;
                  this.dataService.finishLoading();
                  resolve(true)
                }, error =>{
                  alert('Nimadur hato ketti yana bir bor urinib ko\'ring!');
                  console.error(error);
                })
            }else{
              alert('Nimadur hato ketti yana bir bor urinib ko\'ring!');
            }
          }, error =>{
            alert('Nimadur hato ketti yana bir bor urinib ko\'ring!');
            console.error(error);
          });        
    })

  }
  getTimetableSecHalf = () => {
    return new Promise((resolve, reject) => {
        this.http.post(environment.http.getTimetableSecHalf.path, 
            { 
              a: environment.h_a,
              name: this.dataService.name,
            }
        ).subscribe((result:any)=>{
            if (result.status === 200) {
                this.dataService.rooms = result.rooms
                this.dataService.groups = result.groups;
                this.dataService.curriculum = result.curriculum;
                resolve(true)
            }else{
              alert('Nimadur hato ketti yana bir bor urinib ko\'ring!');
            }
          }, error =>{
            alert('Nimadur hato ketti yana bir bor urinib ko\'ring!');
            console.error(error);
          });        
    })
  }
    addArea(gt: string, area: any){
        return this.http.post(environment.http.addArea.path, 
            { 
              user: this.authService.user_sec,
              a: environment.h_a,
              gt,
              name: this.dataService.name,
              area,
            }
        )       
    }
    setWeekNumber(gt: string,  time:any, weekNumber: any){
      return this.http.post(environment.http.setWeekNumber.path, 
          { 
            user: this.authService.user_sec,
            a: environment.h_a,
            gt,
            name: this.dataService.name,
            time,
            weekNumber
          }
      )       
    }
    copyTimeTable(gt: string, data: any){
      return this.http.post(environment.http.copyTimeTable.path, 
          { 
            user: this.authService.user_sec,
            a: environment.h_a,
            gt,
            name: this.dataService.name,
            data,
          }
      )       
    }
    removeArea(gt: string, file_name: any){
      return this.http.post(environment.http.removeArea.path, 
          { 
            user: this.authService.user_sec,
            a: environment.h_a,
            gt,
            name: this.dataService.name,
            file_name,
          }
      )       
    }
    editRoom(gt: string, file_name: any, room:any){
      return this.http.post(environment.http.editRoom.path, 
          { 
            user: this.authService.user_sec,
            a: environment.h_a,
            gt,
            name: this.dataService.name,
            file_name,
            room
          }
      )       
    }
    editArea(gt: string, file_name: any, area:any){
      return this.http.post(environment.http.editArea.path, 
          { 
            user: this.authService.user_sec,
            a: environment.h_a,
            gt,
            name: this.dataService.name,
            file_name,
            area
          }
      )       
    }
    editGroup(gt: string, file_name: any, group:any){
      return this.http.post(environment.http.editGroup.path, 
          { 
            user: this.authService.user_sec,
            a: environment.h_a,
            gt,
            name: this.dataService.name,
            file_name,
            group
          }
      )       
    }
    editSubject(gt: string, file_name: any, subject:any){
      return this.http.post(environment.http.editSubject.path, 
          { 
            user: this.authService.user_sec,
            a: environment.h_a,
            gt,
            name: this.dataService.name,
            file_name,
            subject
          }
      )       
    }
    editTeacher(gt: string, file_name: any, teacher:any){
      return this.http.post(environment.http.editTeacher.path, 
          { 
            user: this.authService.user_sec,
            a: environment.h_a,
            gt,
            name: this.dataService.name,
            file_name,
            teacher
          }
      )       
    }
    addGroup(gt: string, group: any){
        return this.http.post(environment.http.addGroup.path, 
          { 
            user: this.authService.user_sec,
            a: environment.h_a,
            gt,
            name: this.dataService.name,
            group,
          }
      )       
    }
    addSubject(gt: string, subject: any){
      return this.http.post(environment.http.addSubject.path, 
        { 
          user: this.authService.user_sec,
          a: environment.h_a,
          gt,
          name: this.dataService.name,
          subject,
        }
      )       
    }
    removeSubject(gt: string, file_name: any){
      return this.http.post(environment.http.removeSubject.path, 
          { 
            user: this.authService.user_sec,
            a: environment.h_a,
            gt,
            name: this.dataService.name,
            file_name,
          }
      )       
    }
    removeGroup(gt: string, file_name: any){
      return this.http.post(environment.http.removeGroup.path, 
          { 
            user: this.authService.user_sec,
            a: environment.h_a,
            gt,
            name: this.dataService.name,
            file_name,
          }
      )       
    }
  addTeacher(gt: string, teacher: any){
    return this.http.post(environment.http.addTeacher.path, 
        { 
          user: this.authService.user_sec,
          a: environment.h_a,
          gt,
          name: this.dataService.name,
          teacher,
        }
    )       
  }
  removeTeacher(gt: string, file_name: any){
    return this.http.post(environment.http.removeTeacher.path, 
        { 
          user: this.authService.user_sec,
          a: environment.h_a,
          gt,
          name: this.dataService.name,
          file_name,
        }
    )       
  }
  addRoom(gt: string, room: any){
    return this.http.post(environment.http.addRoom.path, 
      { 
        user: this.authService.user_sec,
        a: environment.h_a,
        gt,
        name: this.dataService.name,
        room,
      }
    )       
  }
  saveGenTimeTable(gt: string, gen_time_table: any){
    return this.http.post(environment.http.saveGenTimeTable.path, 
      { 
        user: this.authService.user_sec,
        a: environment.h_a,
        gt,
        name: this.dataService.name,
        rooms: this.dataService.rooms,
        teachers: this.dataService.teachers,
        gen_time_table,
      }
    )       
  }
  changeTimeTable(gt: string, time: any){
    return this.http.post(environment.http.changeTimeTable.path, 
      { 
        user: this.authService.user_sec,
        a: environment.h_a,
        gt,
        name: this.dataService.name,
        time,
      }
    )       
  }
  removeFromTimeTable(gt: string, data: any){
    return this.http.post(environment.http.removeFromTimeTable.path, 
      { 
        user: this.authService.user_sec,
        a: environment.h_a,
        gt,
        name: this.dataService.name,
        data,
      }
    )       
  }
  removeBookedRoomTeacher(gt: string, data: any){
    return this.http.post(environment.http.removeBookedRoomTeacher.path, 
      { 
        user: this.authService.user_sec,
        a: environment.h_a,
        gt,
        name: this.dataService.name,
        data,
      }
    )       
  }
  getGenTimeTables(gt: string){
    return this.http.post(environment.http.getGenTimeTables.path, 
      { 
        user: this.authService.user_sec,
        a: environment.h_a,
        gt,
        name: this.dataService.name,
      }
    )       
  }
  getTimeTables(gt: string){
    return this.http.post(environment.http.getTimeTables.path, 
      { 
        user: this.authService.user_sec,
        a: environment.h_a,
        gt,
        name: this.dataService.name,
        week: this.dataService.week
      }
    )       
  }
  addNewLesson(gt: string, data:any){
    return this.http.post(environment.http.addNewLesson.path, 
      { 
        user: this.authService.user_sec,
        a: environment.h_a,
        gt,
        name: this.dataService.name,
        data
      }
    )       
  }
  addNewLessonToMain(gt: string, data:any){
    return this.http.post(environment.http.addNewLessonToMain.path, 
      { 
        user: this.authService.user_sec,
        a: environment.h_a,
        gt,
        name: this.dataService.name,
        data
      }
    )       
  }
  removeRoom(gt: string, file_name: any){
    return this.http.post(environment.http.removeRoom.path, 
        { 
          user: this.authService.user_sec,
          a: environment.h_a,
          gt,
          name: this.dataService.name,
          file_name,
        }
    )       
  }
  addStream(gt: string, stream: any, courseNumber:any){
    return this.http.post(environment.http.addStream.path, 
      { 
        user: this.authService.user_sec,
        a: environment.h_a,
        gt,
        name: this.dataService.name,
        stream,
        courseNumber
      }
    )       
  }
  removeStream(gt: string, stream_folder: any, courseNumber:any){
    return this.http.post(environment.http.removeStream.path, 
        { 
          user: this.authService.user_sec,
          a: environment.h_a,
          gt,
          name: this.dataService.name,
          stream_folder,
          courseNumber
        }
    )       
  }
  editStream(gt: string, stream_folder: any, courseNumber:any, stream: any){
    return this.http.post(environment.http.editStream.path, 
        { 
          user: this.authService.user_sec,
          a: environment.h_a,
          gt,
          name: this.dataService.name,
          stream_folder,
          courseNumber,
          stream
        }
    )       
  }
  removeCurriculum(gt: string, file_name: any, courseNumber:any){
    return this.http.post(environment.http.removeCurriculum.path, 
        { 
          user: this.authService.user_sec,
          a: environment.h_a,
          gt,
          name: this.dataService.name,
          file_name,
          courseNumber
        }
    )       
  }
  editCurriculum(gt: string, file_name: any, courseNumber:any, curriculum:any){
    return this.http.post(environment.http.editCurriculum.path, 
        { 
          user: this.authService.user_sec,
          a: environment.h_a,
          gt,
          name: this.dataService.name,
          file_name,
          courseNumber,
          curriculum
        }
    )       
  }
  addCurriculum(gt: string, curriculum: any, courseNumber:any){
    return this.http.post(environment.http.addCurriculum.path, 
      { 
        user: this.authService.user_sec,
        a: environment.h_a,
        gt,
        name: this.dataService.name,
        curriculum,
        courseNumber
      }
    )       
  }
  genTokForReq = () => {
    return new Promise((resolve, reject) => {
        this.http.post(environment.http.genTokForReq.path, 
            { 
              a: environment.h_a,
              user: this.authService.user_sec,
            }
        ).subscribe((result:any)=>{
            console.log('genTokForReq', result)
            if (result.status === 200) {
                resolve(result.gt)
            }else{
                alert('1 Nimadur hato ketti yana bir bor urinib ko\'ring!');
                reject();
            }
          }, error =>{
            alert('2 Nimadur hato ketti yana bir bor urinib ko\'ring!');
            reject();
            console.error(error);
          });        
    })

  }

}