package edu.tarleton;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;

public class LoginBean {
    private String email;
    private String password;
    
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
        File userFile = new File(this.email);
        if(userFile.exists()){
            try{
                FileInputStream fis = new FileInputStream(userFile);
                BufferedReader bf =  new BufferedReader(new InputStreamReader(fis));
                String password = bf.readLine();
                if(password.equals(this.password)){
                      return "menu_page";
                }
            }
            catch(Exception ex){
                ex.printStackTrace();
            }
        }
        
        return "failed_login";
    }
}
