import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;
@Schema()
export class Project {

  @Prop() name: string;
  @Prop({ type: Array }) goal;
  @Prop({ type: Array }) projPass;
  @Prop({ type: Array }) tasks;
  @Prop({ type: Array }) kafed;
  @Prop({ type: Array }) conDep;
  @Prop({ type: Array }) spinOf;
  @Prop({ type: Object }) mainData;


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
