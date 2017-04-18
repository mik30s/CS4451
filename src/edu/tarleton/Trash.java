package edu.tarleton;

import java.io.File;
import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

public class Trash {

    public static void main(String[] args) throws Exception {
        User[] users = new User[]{
                new User("kate@gmail.com", "Administrator", "12345", "Kate Hall"),
                new User("mario@gmail.com", "Technician", "12345", "Mario Mario"),
                new User("luigi@gmail.com", "Evaluator", "1234", "Luigi Mario"),
                new User("mosei27@live.com", "Administrator", "99", "Michael Osei")
        };
        
        TestSubject s1 = new TestSubject(42,TestSubject.Group.CONTROL, "Henrietta", TestSubject.Sex.FEMALE);
        s1.notes = "The healthy pig from sesame street";
        s1.addDailyRecord(s1.new Daily());
        s1.addWeeklyRecord(s1.new Weekly());
        s1.addSTZInductionRecord(s1.new STZInduction());
        
        TestSubject s2 = new TestSubject(24,TestSubject.Group.TEST, "Bridget", TestSubject.Sex.FEMALE);
        s2.notes = "That funny pig from wolf among us";
        s2.addDailyRecord(s2.new Daily());
        s2.addWeeklyRecord(s2.new Weekly());
        s2.addSTZInductionRecord(s2.new STZInduction());
        
        TestSubject[] subs = new TestSubject[]{
                s1, s2
        };

        for(User user : users) {
        	File file = new File("C:\\tmp\\course-project\\userdata\\"+user.getEmail());
        	file.createNewFile();
            ObjectOutputStream os = new ObjectOutputStream(new FileOutputStream(file));
            os.writeObject(user);
            os.close();
        }
        
        for(TestSubject sub : subs) {
        	File file = new File("C:\\tmp\\course-project\\testsubjectdata\\"+sub.id+".dat");
        	file.createNewFile();
            ObjectOutputStream os = new ObjectOutputStream(new FileOutputStream(file));
            os.writeObject(sub);
            os.close();
        }
    }
}