package edu.tarleton;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
    
    public String add() throws Exception {
        user.clearFields();
        System.out.println("calling add");
        
        if (user.getEmail() != null) {
            File file = new File("C:\\tmp\\course-project\\userdata\\"+user.getEmail());
            FileOutputStream fos = new FileOutputStream(file);
            ObjectOutputStream os = new ObjectOutputStream(fos);
            os.writeObject(user);
            os.close();
            
            return "admin";
        }
        
        return "failed_add_profile";
    }
    
    public String get() throws Exception {
        // get use information from files and database tables
        if(id != null) {
            File file = new File("C:\\tmp\\course-project\\userdata\\"+id);
            FileInputStream fis = new FileInputStream(file);
            ObjectInputStream ois = new ObjectInputStream(fis);
            user = (User)ois.readObject();
            System.out.println("User is "+user.getFullName());
            ois.close();
            
            if(editAllowed) {
                return "edit_profile";
            }
            else{
                return "view_profile";
            }
        }
        
        return "session_over";
    }
    
    public String modify(String id) throws Exception {
        System.out.println("calling modify.");
        System.out.println("id = "+ this.id);
        // get use information from files and database tables
        if(id != null){
            File file = new File("C:\\tmp\\course-project\\userdata\\"+id);
            FileOutputStream fis = new FileOutputStream(file);
            ObjectOutputStream ois = new ObjectOutputStream(fis);
            ois.writeObject(this.user);
            System.out.println("updated  "+user.getFullName());
            ois.close();
            
            return "view_profile?faces-redirect=true&id="+this.id+"&"+"edit=true";
        }
        
        return "session_over";
    }
    
    public String delete(String id) throws Exception {
        System.out.println("calling delete.");
        System.out.println("id = "+ id);
        String filePath = "C:\\tmp\\course-project\\userdata\\"+id;
        if(id != null) {
            System.out.println("id = "+ id);
            File file = new File("C:\\tmp\\course-project\\userdata\\"+id);
            if(file.exists()) {
                System.out.println(id + " has been found");
                Files.delete(Paths.get(filePath));
                System.out.println(id + " has been deleted");
                return "admin";
            }
        }
        
        return "session_over";
    }
}
