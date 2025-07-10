package com.task.task.repositories;
import com.task.task.repositories.Interfaces.IAdRepository;
import org.springframework.stereotype.Repository;

@Repository
public class AdRepository {
    private final IAdRepository _adRepository;

    public AdRepository(IAdRepository adRepository) {
        this._adRepository = adRepository;
    }
}