package com.stackroute.productsearchservice.service;

import com.stackroute.productsearchservice.exception.ProductAlreadyExistsException;
import com.stackroute.productsearchservice.exception.ProductNotFoundException;
import com.stackroute.productsearchservice.domain.ProductDetails;
import com.stackroute.productsearchservice.repository.ProductSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ProductSearchServiceImpl implements ProductSearchService {

    @Autowired
    private ProductSearchRepository productSearchRepository;

    ProductDetails productDetails1;

    @Autowired
    public ProductSearchServiceImpl(ProductSearchRepository productSearchRepository)
    {
        this.productSearchRepository=productSearchRepository;
    }


    @Override
    public ProductDetails saveProduct(ProductDetails productDetails) throws ProductAlreadyExistsException {

        if(productSearchRepository.existsById(productDetails.getProductName()))
        {
         throw new ProductAlreadyExistsException("Product already exists");
        }
        else{
            ProductDetails savedProducts=productSearchRepository.save(productDetails);
            return savedProducts;
        }

    }

    @Override
    public List<ProductDetails> getAllProducts() {
        return productSearchRepository.findAll();
    }

    @Override
    public ProductDetails deleteProduct(String productName) throws ProductNotFoundException {
        if(productSearchRepository.existsById(productName))
        {
            productSearchRepository.deleteById(productName);
        }
        else
        {
            throw new ProductNotFoundException("Details not found");
        }
        return null;

    }

    @Override
    public ProductDetails updateProduct(ProductDetails productDetails,String productName) throws ProductNotFoundException {
        ProductDetails productDetails1=null;
        if(productSearchRepository.existsById(productName))
        {
            productDetails.setDescription(productDetails.getDescription());
            productDetails1=productSearchRepository.save(productDetails);

        }
        else
        {
            throw new ProductNotFoundException("Details not found");
        }

        return productDetails1;
    }

    @Override
    public ProductDetails getProductByName(String productName) throws ProductNotFoundException {
         Optional optional=null;
         optional=productSearchRepository.findById(productName);
         if(optional.isPresent())
        {

            productDetails1=productSearchRepository.findById(productName).get();

        }
        else
        {
            throw new ProductNotFoundException("Details not found");
        }

        return productDetails1;
    }



}