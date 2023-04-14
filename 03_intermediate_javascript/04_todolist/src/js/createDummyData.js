import Database from "./components/Database";

export const createDummyData = () => {
  Database.addTask("reminder", "go to sleep at 10", "high", "2023-04-13");
  Database.addTask("reminder", "wake up at 1", "medium", "2023-05-21");
  Database.addTask("reminder", "do homework", "high", "2023-05-21");
  Database.addTask("reminder2", "go to sleep at 9", "low", "2023-12-10");
  Database.addTask("reminder", "go to sleep at 8", "high", "2022-02-09");
  Database.addTask("reminder", "go to sleep at 0", "medium", "2023-08-11");
  Database.addTask("reminder", "go to sleep at 1", "medium", "2023-04-20");
};
