package edu.tarleton;

import java.io.Serializable;

public class Weekly implements Serializable{
    public int id;
    public String name;
    public float IOP;
    public float weight;
    public Weekly(){}
    public Weekly(float iOP, float weight) {
        super();
        IOP = iOP;
        this.weight = weight;
    }
    public float getIOP() {
        return IOP;
    }
    public void setIOP(float iOP) {
        IOP = iOP;
    }
    public float getWeight() {
        return weight;
    }
    public void setWeight(float weight) {
        this.weight = weight;
    }
}
