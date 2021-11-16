export class Door {
  id: string = '';
  projectId: string | null = '';
  name: string = '';
  room: string = '';
  building: string = '';
  floor: string = '';
  height: string = '';
  width: string = '';
  lock: {
    type: string;
    qty: string;
    material: string;
    isCompleted: boolean;
  } = {
      type: "",
      qty: "",
      material: "",
      isCompleted: false
  };
  cyclinder: {
    type: string;
    qty: string;
    material: string;
    isCompleted: boolean;
  } = {
      type: "",
      qty: "",
      material: "",
      isCompleted: false
  };
  frame: {
    type: string;
    isCompleted: boolean;
  } = {
      type: "",
      isCompleted: false
  };
}
