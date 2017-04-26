package edu.tarleton;

import java.io.Serializable;
 
public class TestSubject implements Serializable {
    enum Group {CONTROL, TEST}
    enum Sex {MALE, FEMALE}
    
    public int id;
    public Sex sex;
    public String name;
    public Group group;
    public Daily dailyAM;
    public Daily dailyPM;
    public BedCheck bedCheck;
    public Weekly weekly;
    public STZInduction stzInduction;
    public String notes;
    
    public TestSubject(){
        // do noting
    }
    
    

	public TestSubject(int i, Group group, String name, Sex sex){
        this.id = i;
        this.sex = sex;
        this.group = group;
        this.name = name;
        dailyAM = new Daily();
        dailyAM.id = this.id;
        dailyAM.name = this.name;
        dailyPM = new Daily();
        bedCheck = new BedCheck();
        weekly = new Weekly();
        weekly.id = this.id;
        weekly.name = this.name;
        stzInduction = new STZInduction();
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
    
    public STZInduction getStzInduction() {
		return stzInduction;
	}

	public void setStzInduction(STZInduction stzInduction) {
		this.stzInduction = stzInduction;
	}
}
