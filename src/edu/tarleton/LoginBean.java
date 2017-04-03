package edu.tarleton;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
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
        File userFile = new File("C:\\tmp\\"+this.email+".txt");
        if(userFile.exists()){
            System.out.println("opening file");
            try{
                FileInputStream fis = new FileInputStream(userFile);
                BufferedReader bf =  new BufferedReader(new InputStreamReader(fis));
                String password = bf.readLine();
                String mode = bf.readLine();
                if(password.equals(this.password)){
                      System.out.println("found password");
                      bf.close();
                      if(mode.equals("admin")){
                          return "admin";
                      }
                      else if(mode.equals("data_entry")){
                          return "data_entry";
                      }
                      else if(mode.equals("evaluator")){
                          return "evaluator";
                      }
                }
                bf.close();
            }
            catch(Exception ex){
                ex.printStackTrace();
            }
        }
        
        return "failed_login";
    }
}
