package edu.tarleton;

import java.io.Serializable;

public class STZInduction implements Serializable {
    public float STZAdministered;
    public float salineAmount;
    
    public STZInduction(){}
    public STZInduction(float admins, float saline){
        super();
        this.STZAdministered = admins;
        this.salineAmount = saline;
    }
    public String getSTZAdministered() {
        return new Float(STZAdministered).toString();
    }
    public void setSTZAdministered(String sTZAdministered) {
        STZAdministered = Float.parseFloat(sTZAdministered);
    }
    public float getSalineAmount() {
        return salineAmount;
    }
    public void setSalineAmount(float salineAmount) {
        this.salineAmount = salineAmount;
    }
}
