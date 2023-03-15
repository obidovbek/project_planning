import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;
@Schema()
export class Project {

  @Prop() name: string;
  @Prop() goal: Array<string>;
  @Prop() projPass: Array<string>;
  @Prop() tasks: Array<string>;
  @Prop() kafed: Array<string>;
  @Prop() conDep: Array<string>;
  @Prop() spinOf: Array<string>;
  @Prop() mainData: Array<string>;


}
// : ['12 goal'],
// : ['projPass'],
// : ['tasks'],
// : ['kafed'],
// : ['conDep'],
// : ['spinOf'],
// : {
//   title: 'Loyiha nomini kirgizing?',
//   owner: '"Kimyo texnologiya" fakulteti 72-21 elita guruh talabasi Jo‘rayev Javohir',
//   cost: 'cost',
//   workplace: 'workplace'
// }
export const ProjectSchema = SchemaFactory.createForClass(Project);
