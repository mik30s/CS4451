package edu.tarleton;

import java.io.File;
import java.io.FileInputStream;
import java.io.ObjectInputStream;

public class Utility {
    
    @SuppressWarnings("unchecked")
    public static <E> E readObjectFromFile(String filename) throws Exception{
        E object; 
        File file = new File(filename);
        FileInputStream fis =  new FileInputStream(file);
        ObjectInputStream ois = new ObjectInputStream(fis);
        object = (E)ois.readObject();
        ois.close();
        
        return object;
    }
}
