package com.task.task.repositories.Interfaces;
import org.springframework.data.jpa.repository.JpaRepository;
import com.task.task.entities.Ad;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface IAdRepository extends JpaRepository<Ad, Long>, JpaSpecificationExecutor<Ad> {

}

