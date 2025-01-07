import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, ChevronDown, Clock, Globe, Database } from "lucide-react";

const App = () => {
  const [trends, setTrends] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [showRecords, setShowRecords] = useState(false);

  const fetchTrends = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:5000/fetch_trends");
      const data = await response.json();
      const { trends, ip_address, object_id, error } = data;
      if (error === "false") {
        setTrends({ trends, ip_address, object_id });
      } else {
        setError(error);
      }
    } catch (err) {
      setError("Failed to fetch trends. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecords = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/dashboard");
      const data = await response.json();
      const { records, error } = data;
      if (error === "false") {
        setRecords(records);
        setShowRecords(true);
      } else {
        setError(error);
      }
    } catch (err) {
      setError("Failed to fetch past records. " + err.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.h1
            className="text-5xl font-bold text-gray-800 mb-4 tracking-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            X Trending Topics
          </motion.h1>
          <p className="text-gray-600 text-lg">
            {`Discover what's trending right now`}
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <motion.button
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 font-semibold transition-colors duration-200 hover:bg-blue-700"
            onClick={fetchTrends}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Fetching trends..." : "Fetch Latest Trends"}
          </motion.button>

          <motion.button
            className="px-6 py-3 bg-gray-700 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 font-semibold transition-colors duration-200 hover:bg-gray-800"
            onClick={fetchRecords}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Database className="w-5 h-5" />
            View Past Records
          </motion.button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <p className="text-red-700">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {trends && (
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Current Trends
              </h2>
              <motion.ul
                className="space-y-4 mb-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {Object.values(trends.trends).map((trend, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    variants={itemVariants}
                  >
                    <span className="text-blue-500 font-mono">{index + 1}</span>
                    <span className="text-gray-700">{trend}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="border-t pt-6 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>IP Address: {trends.ip_address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  <span>Object ID: {trends.object_id}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showRecords && records.length > 0 && (
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Past Records
                </h2>
                <motion.button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowRecords(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronDown className="w-6 h-6" />
                </motion.button>
              </div>

              <motion.div
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {records.map((record, index) => (
                  <motion.div
                    key={index}
                    className="border rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
                    variants={itemVariants}
                  >
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(record.timestamp).toLocaleString()}</span>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Globe className="w-4 h-4" />
                        <span>IP: {record.ip_address}</span>
                      </div>

                      <div className="pl-4 border-l-2 border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">
                          Trends:
                        </h4>
                        <ul className="space-y-2">
                          {record.trends.map((trend, idx) => (
                            <li key={idx} className="text-gray-600 text-sm">
                              {trend}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="text-xs text-gray-500">
                        ID: {record._id}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default App;
