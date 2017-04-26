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
        
        
        TestSubject[] subs = new TestSubject[]{
            new TestSubject(44,TestSubject.Group.TEST, "Wally", TestSubject.Sex.MALE), 
            new TestSubject(52,TestSubject.Group.TEST, "Betty", TestSubject.Sex.MALE),
            new TestSubject(51,TestSubject.Group.TEST, "Bacon", TestSubject.Sex.MALE), 
            new TestSubject(50,TestSubject.Group.TEST, "Amber", TestSubject.Sex.MALE), 
            new TestSubject(49,TestSubject.Group.TEST, "Pugsly", TestSubject.Sex.MALE), 
            new TestSubject(48,TestSubject.Group.TEST, "Polly", TestSubject.Sex.MALE), 
            new TestSubject(49,TestSubject.Group.TEST, "Shepard", TestSubject.Sex.MALE), 
            new TestSubject(53,TestSubject.Group.TEST, "Farley", TestSubject.Sex.MALE), 
            new TestSubject(54,TestSubject.Group.TEST, "Clarice", TestSubject.Sex.MALE), 
            new TestSubject(55,TestSubject.Group.TEST, "Charlotte", TestSubject.Sex.MALE),
            new TestSubject(56,TestSubject.Group.TEST, "Hannah", TestSubject.Sex.MALE),
            new TestSubject(57,TestSubject.Group.TEST, "Jolly", TestSubject.Sex.MALE),
            new TestSubject(58,TestSubject.Group.TEST, "Lemon", TestSubject.Sex.MALE),
            new TestSubject(59,TestSubject.Group.TEST, "Piggy", TestSubject.Sex.MALE),
            new TestSubject(60,TestSubject.Group.TEST, "Ringo", TestSubject.Sex.MALE),
            new TestSubject(61,TestSubject.Group.TEST, "Bigbone", TestSubject.Sex.MALE),
            new TestSubject(62,TestSubject.Group.TEST, "Tyson", TestSubject.Sex.MALE),
            new TestSubject(63,TestSubject.Group.TEST, "Scarlet", TestSubject.Sex.MALE),
            new TestSubject(64,TestSubject.Group.TEST, "Rose", TestSubject.Sex.MALE),
            new TestSubject(65,TestSubject.Group.TEST, "Pinky", TestSubject.Sex.MALE),
            new TestSubject(66,TestSubject.Group.TEST, "Ziggy", TestSubject.Sex.MALE),
            new TestSubject(67,TestSubject.Group.TEST, "Zoey", TestSubject.Sex.MALE),
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