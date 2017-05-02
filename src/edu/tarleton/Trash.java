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
            new TestSubject(1,TestSubject.Group.TEST, "Wally", TestSubject.Sex.MALE), 
            new TestSubject(2,TestSubject.Group.TEST, "Betty", TestSubject.Sex.MALE),
            new TestSubject(3,TestSubject.Group.TEST, "Bacon", TestSubject.Sex.MALE), 
            new TestSubject(4,TestSubject.Group.TEST, "Amber", TestSubject.Sex.MALE), 
            new TestSubject(5,TestSubject.Group.TEST, "Pugsly", TestSubject.Sex.MALE), 
            new TestSubject(6,TestSubject.Group.TEST, "Polly", TestSubject.Sex.MALE), 
            new TestSubject(7,TestSubject.Group.TEST, "Shepard", TestSubject.Sex.MALE), 
            new TestSubject(8,TestSubject.Group.TEST, "Farley", TestSubject.Sex.MALE), 
            new TestSubject(9,TestSubject.Group.TEST, "Clarice", TestSubject.Sex.MALE), 
            new TestSubject(10,TestSubject.Group.TEST, "Charlotte", TestSubject.Sex.MALE),
            new TestSubject(11,TestSubject.Group.TEST, "Hannah", TestSubject.Sex.MALE),
            new TestSubject(12,TestSubject.Group.TEST, "Jolly", TestSubject.Sex.MALE),
            new TestSubject(13,TestSubject.Group.TEST, "Lemon", TestSubject.Sex.MALE),
            new TestSubject(14,TestSubject.Group.TEST, "Piggy", TestSubject.Sex.MALE),
            new TestSubject(15,TestSubject.Group.TEST, "Ringo", TestSubject.Sex.MALE),
            new TestSubject(16,TestSubject.Group.TEST, "Bigbone", TestSubject.Sex.MALE),
            new TestSubject(17,TestSubject.Group.TEST, "Tyson", TestSubject.Sex.MALE),
            new TestSubject(18,TestSubject.Group.TEST, "Scarlet", TestSubject.Sex.MALE),
            new TestSubject(20,TestSubject.Group.TEST, "Rose", TestSubject.Sex.MALE),
            new TestSubject(21,TestSubject.Group.TEST, "Pinky", TestSubject.Sex.MALE),
            new TestSubject(22,TestSubject.Group.TEST, "Ziggy", TestSubject.Sex.MALE),
            new TestSubject(23,TestSubject.Group.TEST, "Zoey", TestSubject.Sex.MALE),
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