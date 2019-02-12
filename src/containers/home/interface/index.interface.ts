export interface IHomeState {
  howitworksGroup: IStepItem[][]
}

interface IStepItem {
  index: number;
  img: string;
  title: string;
  content: string;
}