package edu.tarleton;

import java.io.File;
import java.io.FileInputStream;
import java.io.ObjectInputStream;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/technician")
public class TechnicianBean {
    private ArrayList<TestSubject> subjects;
    
    public void load() throws Exception {
        subjects = new ArrayList<>();
        File folder = new File("C:\\tmp\\course-project\\testsubjectdata");
        File[] listOfFiles = folder.listFiles();
        System.out.println("loading subjects");;
        for (File file : listOfFiles) {
            TestSubject subject;
            if (file.isFile()) {
                subject = Utility.<TestSubject>readObjectFromFile(file.getAbsolutePath());
                subjects.add(subject);
                System.out.println(subject.getName());
            }
        }
    }

    public ArrayList<TestSubject> getSubjects() {
        return subjects;
    }

    public void setSubjects(ArrayList<TestSubject> subjects) {
        this.subjects = subjects;
    }
}
