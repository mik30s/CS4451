package edu.tarleton;

import java.io.Serializable;

public class BedCheck implements Serializable {
    public float bloodGlucoseLevel;
    public float amountInsulinAdmin;
    
    public BedCheck(){}
    public BedCheck(float bloodGlucoseLevel, float amountInsulinAdmin){
        this.amountInsulinAdmin = amountInsulinAdmin;
        this.bloodGlucoseLevel = bloodGlucoseLevel;
    }
    public float getBloodGlucoseLevel() {
        return bloodGlucoseLevel;
    }
    public void setBloodGlucoseLevel(float bloodGlucoseLevel) {
        this.bloodGlucoseLevel = bloodGlucoseLevel;
    }
    public float getAmountInsulinAdmin() {
        return amountInsulinAdmin;
    }
    public void setAmountInsulinAdmin(float amountInsulinAdmin) {
        this.amountInsulinAdmin = amountInsulinAdmin;
    }
}