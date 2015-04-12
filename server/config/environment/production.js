'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
            "mongodb://IbmCloud_qlum225q_qqtdr8bu_7hsenrbu:D5SiXgiEtN2pEAzGWGXrFknPz0pAwCFV@ds055190.mongolab.com:55190/IbmCloud_qlum225q_qqtdr8bu?replicaSet=rs-ds055190"
  }
};