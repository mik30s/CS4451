package edu.tarleton;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.ObjectInputStream;

public class LoginBean {
    private String email;
    private String password;
    private User user;
    
    public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public  String getEmail(){
        return email;
    }
    
    public  void setEmail(String email){
        this.email = email;
    }
    
    public  String getPassword(){
        return password;
    }
    
    public void setPassword(String pass){
        this.password = pass;
    }
    
    public String logIn(){
        // check if users file exists
        File userFile = new File("C:\\tmp\\course-project\\userdata\\"+this.email);
        if(userFile.exists()){
            //System.out.println("opening file");
            try{
                FileInputStream fis = new FileInputStream(userFile);
                ObjectInputStream of =  new ObjectInputStream(fis);
                this.user = (User)of.readObject();
                if(password.equals(user.getPassword())){
                      System.out.println("found password");
                      of.close();
                      if(user.getType().equals("admin")){
                          return "admin";
                      }
                      else if(user.getType().equals("data")){
                          return "data_entry";
                      }
                      else if(user.getType().equals("user")){
                          return "evaluator";
                      }
                }
                of.close();
            }
            catch(Exception ex){
                ex.printStackTrace();
            }
        }
        
        return "failed_login";
    }
}
