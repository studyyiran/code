export interface IHomeState {
  howitworksGroup: IStepItem[][]
  times: string[]
}

interface IStepItem {
  index: number;
  img: string;
  title: string;
  content: string;
}