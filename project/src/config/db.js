module.exports = {
  connect: async () => {
    try {
      await mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Database connected');
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  }
};