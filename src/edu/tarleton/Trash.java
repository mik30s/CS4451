package edu.tarleton;

import java.io.File;
import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

import edu.tarleton.Period;

public class Trash {

    public static void main(String[] args) throws Exception {
        User[] users = new User[]{
                new User("kate@gmail.com", "Administrator", "12345", "Kate Hall"),
                new User("mario@gmail.com", "Technician", "12345", "Mario Mario"),
                new User("luigi@gmail.com", "Evaluator", "1234", "Luigi Mario"),
                new User("mosei27@live.com", "Administrator", "99", "Michael Osei")
        };
        
        // first subject
        TestSubject bridget = new TestSubject(42,TestSubject.Group.CONTROL, "Henrietta", TestSubject.Sex.FEMALE);
        {
            bridget.notes = "The healthy pig from sesame street";
            Daily s1DailyAM = new Daily(Period.AM, 0, 0, 0, 0, 0);
            Daily s1DailyPM = new Daily(Period.PM, 0, 0, 0, 0, 0);
            bridget.dailyAM = (s1DailyAM);
            bridget.dailyPM = (s1DailyPM);
            bridget.weekly = (new Weekly());
        }      
        // second subject
        TestSubject henrietta = new TestSubject(43,TestSubject.Group.TEST, "Bridget", TestSubject.Sex.FEMALE);
        {
            henrietta.notes = "That funny pig from the wolf among us";
            Daily s2DailyAM = new Daily(Period.AM, 0, 0, 0, 0, 0);
            Daily s2DailyPM = new Daily(Period.PM, 0, 0, 0, 0, 0);
            henrietta.dailyAM = s2DailyAM;
            henrietta.dailyPM = s2DailyPM;
            henrietta.weekly = new Weekly();
        }
     // second subject
        TestSubject wally = new TestSubject(44,TestSubject.Group.TEST, "Wally", TestSubject.Sex.MALE);
        {
            wally.notes = "That funny pig from the wolf among us";
            Daily s2DailyAM = new Daily(Period.AM, 0, 0, 0, 0, 0);
            Daily s2DailyPM = new Daily(Period.PM, 0, 0, 0, 0, 0);
            wally.dailyAM = s2DailyAM;
            wally.dailyPM = s2DailyPM;
            wally.weekly = new Weekly();
        }
        
     // second subject
        TestSubject paddy = new TestSubject(45,TestSubject.Group.TEST, "Paddy", TestSubject.Sex.MALE);
        {
            paddy.notes = "That funny pig from the wolf among us";
            Daily s2DailyAM = new Daily(Period.AM, 0, 0, 0, 0, 0);
            Daily s2DailyPM = new Daily(Period.PM, 0, 0, 0, 0, 0);
            paddy.dailyAM = s2DailyAM;
            paddy.dailyPM = s2DailyPM;
            paddy.weekly = new Weekly();
        }
        TestSubject[] subs = new TestSubject[]{wally, bridget, henrietta, paddy};

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