package edu.tarleton;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.ObjectInputStream;
import java.util.ArrayList;
import java.util.List;

public class AdminBean {
    ArrayList<User> users ;
    
    public void setUsers(ArrayList users) {
        this.users = users;
    }

    public ArrayList<User> getUsers() throws Exception {
        users = new ArrayList<User>();
        File folder = new File("C:/tmp/course-project/userdata");
        File[] listOfFiles = folder.listFiles();

        for (File file : listOfFiles) {
            User user ;
            if (file.isFile()) {
                FileInputStream fis = new FileInputStream(file);
                ObjectInputStream oi = new ObjectInputStream(fis);
                user = (User)oi.readObject();
                users.add(user);
            }
        }

        return users;
    }
}
