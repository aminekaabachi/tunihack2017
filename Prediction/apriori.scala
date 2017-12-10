import org.apache.spark.mllib.fpm.FPGrowth
import org.apache.spark.rdd.RDD

val data = sc.textFile("Apriori/output.csv")

val transactions: RDD[Array[String]] = data.map(s => s.trim.sp
lit(','))

val fpg = new FPGrowth().setMinSupport(0.008).setNumPartitions(10)
val model = fpg.run(transactions)

model.freqItemsets.collect().foreach { itemset =>
  if (itemset.items.size > 2){
  println(itemset.items.mkString("[", ",", "]") + ", " + itemset.freq)}
}
