package edu.tarleton;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.Map;

import javax.faces.context.FacesContext;

public class ProfileBean {
    User user;
    String id;
    boolean editAllowed;
    
    public boolean isEditAllowed() {
		return editAllowed;
	}

	public void setEditAllowed(boolean editAllowed) {
		this.editAllowed = editAllowed;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public User getUser(){
        return this.user;
    }
    
    public void setUser(User user){
        this.user = user;
        System.out.println(user.getEmail());
    }
    
    public String get() throws Exception {
        // get use information from files and database tables
        if(id != null) {
            File file = new File("C:\\tmp\\course-project\\userdata\\"+id);
            FileInputStream fis = new FileInputStream(file);
            ObjectInputStream ois = new ObjectInputStream(fis);
            user = (User)ois.readObject();
            System.out.println("User is "+user.getFullName());
            
            return "profile";
        }
        
        return "session_over";
    }
    
    public String modify() throws Exception {
    	 // get use information from files and database tables
        if(id != null){
            File file = new File("C:\\tmp\\course-project\\userdata\\"+id);
            FileOutputStream fis = new FileOutputStream(file);
            ObjectOutputStream ois = new ObjectOutputStream(fis);
            ois.writeObject(this.user);
            System.out.println("updated  "+user.getFullName());
            
            return "profile";
        }
        
        return "session_over";
    }
    
    public String delete() throws Exception {
        if(id != null) {
            File file = new File("C:\\tmp\\course-project\\userdata\\"+id);
            if(file.exists()){
                file.delete();
                
                return "admin";
            }
        }
        
        return "session_over";
    }
}
