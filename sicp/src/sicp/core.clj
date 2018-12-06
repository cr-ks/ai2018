(ns sicp.core
  (:gen-class))

;; Recursive Exponent Function
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

;; Linear Exponent Function
(defn expt-l 
  [b n]
  (expt-iter b n 1))

(defn -main
  "I don't do a whole lot ... yet."
  [& args]

  (println "Running both Exponent Functions with 13 as a base and 12 as the exponent.")
  (println "--- Recursive Exponent Function  ---")
  (println "Solution: " (time (expt 13 12)))
  (println "--- Linear Exponent Fucntion ---")
  (println "Solution: " (time (expt-l 13 12))))
