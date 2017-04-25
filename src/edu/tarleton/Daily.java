package edu.tarleton;

import java.io.Serializable;

import edu.tarleton.Period;

public class Daily implements Serializable {
    public int id;
    public String name;
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
};