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

        for(User user : users) {
            ObjectOutputStream os = new ObjectOutputStream(new FileOutputStream(new File("C:\\tmp\\course-project\\userdata\\"+user.getEmail())));
            os.writeObject(user);
        }
    }
}