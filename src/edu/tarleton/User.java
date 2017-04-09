package edu.tarleton;

import java.io.Serializable;

public class User implements Serializable {
    
    private String email;
    private String type;
    private String password;
    private String fullName;
    
    public User(){}
    
    public User(String email, String type, String password, String fullName){
        this.email = email;
        this.type = type;  
        this.password = password;
        this.fullName = fullName;
    }
    
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getFullName() {
        return fullName;
    }
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    public void clearFields(){
        this.email = "";
        this.fullName = "";
        this.password = "";
        this.type = "";
    }
}

