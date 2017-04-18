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
        
        TestSubject s1 = new TestSubject();
        s1.notes = "The healthy pig from sesame street";
        s1.addDailyRecord(new TestSubject.Daily());
        s1.addWeeklyRecord(new TestSubject.Weekly());
        s1.addSTZInductionRecord(new TestSubject.STZInduction());
        
        TestSubject s2 = new TestSubject();
        s2.notes = "That funny pig from wolf among us";
        s2.addDailyRecord(new TestSubject.Daily());
        s2.addWeeklyRecord(new TestSubject.Weekly());
        s2.addSTZInductionRecord(new TestSubject.STZInduction());
        
        TestSubject[] subs = new TestSubject[]{
                s1, s2
        };

        for(User user : users) {
            ObjectOutputStream os = new ObjectOutputStream(new FileOutputStream(new File("C:\\tmp\\course-project\\userdata\\"+user.getEmail())));
            os.writeObject(user);
        }
    }
}