package edu.tarleton;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

public class ProfileBean {
     private User user;
     private String id;
     boolean editAllowed;
    
     // new profile fields to create a new user.
     private String newfullName;
     private String newPassword;
     private String newType;
     private String newEmail;
     
    
    // Add a user profile
    public String add() throws Exception {
    	this.user.clearFields();
    	this.user.setEmail(newEmail);
    	this.user.setFullName(newfullName);
    	this.user.setPassword(newPassword);
    	this.user.setType(newType);
        System.out.println("Adding user: " + this.user.getFullName());
        
        if (this.user.getEmail() != null && !this.user.getEmail().equals("")) {
        	System.out.println("About to add user "+ this.user.getEmail());
            File file = new File("C:\\tmp\\course-project\\userdata\\"+this.user.getEmail());
            if (!file.exists()) {
                FileOutputStream fos = new FileOutputStream(file);
                ObjectOutputStream os = new ObjectOutputStream(fos);
                os.writeObject(this.user);
                os.close();
                System.out.println("added new user "+ this.user.getEmail());
                // FacesContext.getCurrentInstance().getExternalContext().redirect("admin.xhtml");
                return "admin";
            }
            else {
                return "failed_add_profile";
            }
        }
        else {
        	System.out.println("user name is not set");;
        }
        return "failed_add_profile";
    }
    
    
    // Get a users profile.
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
    
    // Modify a users profile
    public String modify(String id) throws Exception {
        System.out.println("calling modify.");
        System.out.println("id = "+ this.id);
        // get use information from files and database tables
        if(id != null) {
            File file = new File("C:\\tmp\\course-project\\userdata\\"+id);
            FileOutputStream fis = new FileOutputStream(file);
            ObjectOutputStream ois = new ObjectOutputStream(fis);
            ois.writeObject(this.user);
            System.out.println("updated "+user.getFullName());
            ois.close();
            
            return "view_profile?faces-redirect=true&id="+this.id+"&edit=true";
        }
        
        return "session_over";
    }
    
    // Delete a users profile
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
   
   public void setUser(User user) {
       this.user = user;
       System.out.println(user.getEmail());
   }
   
   public void createNewUser() {
       this.user = new User();
   }
   
   public String getNewfullName() {
       return newfullName;
   }

   public void setNewfullName(String newfullName) {
       this.newfullName = newfullName;
   }

   public String getNewPassword() {
       return newPassword;
   }

   public void setNewPassword(String newPassword) {
       this.newPassword = newPassword;
   }

   public String getNewType() {
       return newType;
   }

   public void setNewType(String newType) {
       this.newType = newType;
   }

   public String getNewEmail() {
       return newEmail;
   }

   public void setNewEmail(String newEmail) {
       this.newEmail = newEmail;
   }


}
