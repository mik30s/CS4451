package edu.tarleton;

import java.io.File;
import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

public class Trash {

    public static void main(String[] args) throws Exception {
        User[] users = new User[]{
                new User("kate@gmail.com", "admin", "12345", "Kate Hall"),
                new User("mario@gmail.com", "data", "12345", "Mario Mario"),
                new User("luigi@gmail.com", "user", "1234", "Luigi Mario"),
                new User("mosei27@live.com", "admin", "99", "Michael Osei")
        };

        for(User user : users) {
            ObjectOutputStream os = new ObjectOutputStream(new FileOutputStream(new File("C:\\tmp\\course-project\\userdata\\"+user.getEmail())));
            os.writeObject(user);
        }
    }
}