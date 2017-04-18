package edu.tarleton;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.ObjectInputStream;

import javax.faces.context.FacesContext;

public class LoginBean {
    private String email;
    private String password;
    private User user;
    private boolean isLoggedIn;
   
    
    public LoginBean getInstance(){
        return this;
    }
    
    public String logIn(){
        System.out.println("loggin in");
        // check if users file exists
        File userFile = new File("C:\\tmp\\course-project\\userdata\\"+this.email);
        if(userFile.exists()){
            System.out.println("opening file");
            try{
                if(this.user == null){
                    FileInputStream fis = new FileInputStream(userFile);
                    ObjectInputStream of =  new ObjectInputStream(fis);
                    this.user = (User)of.readObject();
                    if(password.equals(user.getPassword())){
                          System.out.println("found password");
                          of.close();
                          FacesContext.getCurrentInstance().getExternalContext().getSessionMap().put("user", this.user);
                          if(user.getType().equals("Administrator")) {
                              // create user session
                              FacesContext.getCurrentInstance().getExternalContext().redirect("admin.xhtml");
                          }
                          else if(user.getType().equals("Technician")){
                              FacesContext.getCurrentInstance().getExternalContext().redirect("technician.xhtml");
                          }
                          else if(user.getType().equals("Evaluator")){
                              FacesContext.getCurrentInstance().getExternalContext().redirect("evaluator.xhtml");
                          }
                          isLoggedIn = true;
                          
                          return null;
                    }
                    of.close();
                }
                else{
                    return "failed_login";
                }
            }
            catch(Exception ex){
                ex.printStackTrace();
            }
        }
        
        return "failed_login";
    }
    
    // Performs a user log out.
    // Will invalidate the current session on the server
    // and redirect to the login page.
    public void logout() throws Exception {  
        FacesContext.getCurrentInstance().getExternalContext().invalidateSession();
        isLoggedIn = false;
        FacesContext.getCurrentInstance().getExternalContext().redirect("login.xhtml");
    }
    
    // Annoying java stuff.
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
}
