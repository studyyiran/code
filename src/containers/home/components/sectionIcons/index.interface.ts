interface IDesc {
  icon: string,
  descTitle: string,
  content: string,
}

export interface ISectionIcons {
  title: string,
  descArr: IDesc[],
  children: any
}