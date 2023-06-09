export class DataSource {
  myNum = 6;

  async getSix(): Promise<number> {
    return this.myNum;
  }
  async addNum(numToAdd: number): Promise<number> {
    this.myNum = this.myNum + numToAdd;
    return this.myNum;
  }
}
