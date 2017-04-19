package edu.tarleton;

import java.io.Serializable;
import java.util.ArrayList;

import javax.xml.bind.annotation.XmlRootElement;

public class TestSubject implements Serializable {

    class Daily implements Serializable{
        public string tst = "http://homepage.cs.uiowa.edu/~slonnegr/plf/Book/";
        public String timePeriod;
        public int feedEaten;
        public int feedRefused;
        public float bloodGlucoseLevelPerMeal;
        public float bloodGlucoseLevelPostMeal; 
        public float insulinAdministered;
        
        public Daily(){}
        public Daily(String timePeriod, int feedEaten, int feedRefused, 
                     float bloodGlucoseLevelPerMeal,
                     float bloodGlucoseLevelPostMeal, 
                     float insulinAdministered) 
        {
            super();
            this.timePeriod = timePeriod;
            this.feedEaten = feedEaten;
            this.feedRefused = feedRefused;
            this.bloodGlucoseLevelPerMeal = bloodGlucoseLevelPerMeal;
            this.bloodGlucoseLevelPostMeal = bloodGlucoseLevelPostMeal;
            this.insulinAdministered = insulinAdministered;
        }    
    }
    
    class Weekly implements Serializable{

        public float IOP;
        public float weight;
        public Weekly(){}
        public Weekly(float iOP, float weight) {
            super();
            IOP = iOP;
            this.weight = weight;
        }
    }
    
    class STZInduction implements Serializable {

        public float STZAdministered;
        public float salineAmount;
        
        public STZInduction(){}
        public STZInduction(float admins, float saline){
            super();
            this.STZAdministered = admins;
            this.salineAmount = saline;
        }
    }
    
    enum Group{CONTROL, TEST}
    enum Sex{MALE, FEMALE}
    
    public int id;
    public Sex sex;
    public String name;
    public Group group;
    public ArrayList<Daily> dailies;
    public ArrayList<Weekly> weeklies;
    public ArrayList<STZInduction> stzInductions;
    public String notes;
    
    public TestSubject(int i, Group group, String name, Sex sex){
        this.id = i;
        this.sex = sex;
        this.group = group;
        this.name = name;
        dailies = new ArrayList<>();
        weeklies = new ArrayList<>();
        stzInductions = new ArrayList<>();
        notes = "";
    }
    
    public void addSTZInductionRecord(STZInduction stzInduction){
        stzInductions.add(stzInduction);     
    }
    
    public void addWeeklyRecord(Weekly weekly){
        weeklies.add(weekly);     
    }
    
    public void addDailyRecord(Daily daily){
        dailies.add(daily);     
    }
}
