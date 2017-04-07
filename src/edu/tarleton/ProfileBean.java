package edu.tarleton;

import java.io.File;
import java.io.FileInputStream;
import java.io.ObjectInputStream;

public class ProfileBean {
    User user;
    
    public User getUser(){
        return this.user;
    }
    
    public void setUser(User user){
        this.user = user;
        System.out.println(user.getEmail());
    }
    
    public String getUserProfile(User user) throws Exception {
        // get use information from files and database tables
        File file = new File("C:\\tmp\\course-project\\userdata\\"+user.getEmail());
        FileInputStream fis = new FileInputStream(file);
        ObjectInputStream ois = new ObjectInputStream(fis);
        user = (User)ois.readObject();
        System.out.println(user.getFullName());
        
        return "profile";
    }
}
