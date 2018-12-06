(ns sicp.core
  (:gen-class))

(defn expt 
  [b n]
  (if (= n 0)
    1
    (* b (expt b ( - n 1)))))

(defn expt-iter
  [b counter product]
  (if (= counter 0)
    product
    (expt-iter b (- counter 1) (* b product))))

(defn expt-l 
  [b n]
  (expt-iter b n 1))

(defn -main
  "I don't do a whole lot ... yet."
  [& args]

  (println "Recursive Exponent: " (expt 2 2))
  (println "Linear Exponent: " (expt-l 2 2)))
