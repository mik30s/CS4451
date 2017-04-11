package edu.tarleton;

import javax.faces.bean.ManagedProperty;

public class AppBean {
    
    @ManagedProperty(value="#{loginBean}")
    private LoginBean loginBean;
   
}
