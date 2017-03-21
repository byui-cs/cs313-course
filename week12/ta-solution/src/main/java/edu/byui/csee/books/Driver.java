/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.byui.csee.books;

import java.util.Collection;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

/**
 *
 * @author sburton
 */
public class Driver {
    
    public static void main(String[] args) {
            
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("edu.byui.booksPersistenceUnit");
        EntityManager em = emf.createEntityManager();

        // First, a demo to get a certain author via their ID
        // Get the author with ID: 1
        Author a = em.find(Author.class, 1);
        
        System.out.println("Author: " + a.getName());
        
        Collection<Book> books = a.getBookCollection();
        
        for (Book b : books) {
            System.out.println("  Book: " + b.getTitle());
        }
        System.out.println();
        
        // Now a demo to retrieve each author with their books
        Query q = em.createQuery("SELECT a FROM Author a");
        List<Author> allAuthors = q.getResultList();

        for (Author author : allAuthors) {
            System.out.println("Author: " + author.getName());

            Collection<Book> theirBooks = author.getBookCollection();

            for (Book b : theirBooks) {
                System.out.println("  Book: " + b.getTitle());
            }
        }
        System.out.println();
        
        // Finally a demo to show all the books in the DB with their authors
        q = em.createQuery("SELECT b FROM Book b");
        List<Book> allBooks = q.getResultList();
        
        for (Book b : allBooks) {
            System.out.println("Book: " + b.getTitle() + " by " + b.getAuthor().getName());
        }
        
    }
}
