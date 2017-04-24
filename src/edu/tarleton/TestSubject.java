package edu.tarleton;

import java.io.Serializable;
import java.util.ArrayList;

import javax.xml.bind.annotation.XmlRootElement;

public class TestSubject implements Serializable {
    enum Period {AM, PM};
    enum Group{CONTROL, TEST}
    enum Sex{MALE, FEMALE}
    
    public int id;
    public Sex sex;
    public String name;
    public Group group;
    public Daily dailyAM;
    public Daily dailyPM;
    public BedCheck bedCheck;
    public Weekly weekly;
    public STZInduction stzInductions;
    public String notes;
    
    public class Daily implements Serializable{
        public String timePeriod;
        private int feedEaten;
        public int feedRefused;
        public float bloodGlucoseLevelPerMeal;
        public float bloodGlucoseLevelPostMeal; 
        public float insulinAdministered;
        public Period period;
        
        public Daily(){}
        public Daily(Period period, 
                     int feedEaten, int feedRefused, 
                     float bloodGlucoseLevelPerMeal,
                     float bloodGlucoseLevelPostMeal, 
                     float insulinAdministered) 
        {
            super();
            this.period = period;
            this.feedEaten = feedEaten;
            this.feedRefused = feedRefused;
            this.bloodGlucoseLevelPerMeal = bloodGlucoseLevelPerMeal;
            this.bloodGlucoseLevelPostMeal = bloodGlucoseLevelPostMeal;
            this.insulinAdministered = insulinAdministered;
        }
        public String getTimePeriod() {
            return timePeriod;
        }
        public void setTimePeriod(String timePeriod) {
            this.timePeriod = timePeriod;
        }
        public int getFeedEaten() {
            return feedEaten;
        }
        public void setFeedEaten(int feedEaten) {
            this.feedEaten = feedEaten;
        }
        public int getFeedRefused() {
            return feedRefused;
        }
        public void setFeedRefused(int feedRefused) {
            this.feedRefused = feedRefused;
        }
        public float getBloodGlucoseLevelPerMeal() {
            return bloodGlucoseLevelPerMeal;
        }
        public void setBloodGlucoseLevelPerMeal(float bloodGlucoseLevelPerMeal) {
            this.bloodGlucoseLevelPerMeal = bloodGlucoseLevelPerMeal;
        }
        public float getBloodGlucoseLevelPostMeal() {
            return bloodGlucoseLevelPostMeal;
        }
        public void setBloodGlucoseLevelPostMeal(float bloodGlucoseLevelPostMeal) {
            this.bloodGlucoseLevelPostMeal = bloodGlucoseLevelPostMeal;
        }
        public float getInsulinAdministered() {
            return insulinAdministered;
        }
        public void setInsulinAdministered(float insulinAdministered) {
            this.insulinAdministered = insulinAdministered;
        }
        public Period getPeriod() {
            return period;
        }
        public void setPeriod(Period period) {
            this.period = period;
        } 
    }
    
    public class Weekly implements Serializable{
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
    
    public TestSubject(int i, Group group, String name, Sex sex){
        this.id = i;
        this.sex = sex;
        this.group = group;
        this.name = name;
        dailyAM = new Daily();
        dailyPM = new Daily();
        bedCheck = new BedCheck();
        weekly = new Weekly();
        stzInductions = new STZInduction();
        notes = "";
    }
    
    public Daily getDailyAM() {
        return dailyAM;
    }


    public void setDailyAM(Daily dailiesAM) {
        this.dailyAM = dailiesAM;
    }


    public Daily getDailyPM() {
        return dailyPM;
    }


    public void setDailyPM(Daily dailiesPM) {
        this.dailyPM = dailiesPM;
    }


    public BedCheck getBedCheck() {
        return bedCheck;
    }


    public void setBedCheck(BedCheck bedCheck) {
        this.bedCheck = bedCheck;
    }
    
    public Weekly getWeekly(){
        return this.weekly;
    }


    public void setWeekly(Weekly weeklies) {
        this.weekly = weeklies;
    }


    public void setStzInductions(STZInduction stzInductions) {
        this.stzInductions = stzInductions;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Sex getSex() {
        return sex;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
