export interface IRelation<TN = string, CTC = string, FJC = string> {
  tableName: TN
  currentTableColumn: CTC
  foreignJoinColumn: FJC
}
