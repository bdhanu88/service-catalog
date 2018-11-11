package com.smart.service_catalog.service.settings.generalSettings.category.excep;

public class DuplicateCategoryException extends Exception {
    private static final long serialVersionUID = 4867645708199153376L;

    public DuplicateCategoryException() {
    }

    public DuplicateCategoryException(String arg0) {
        super(arg0);
    }

    public DuplicateCategoryException(Throwable arg0) {
        super(arg0);
    }

    public DuplicateCategoryException(String arg0, Throwable arg1) {
        super(arg0, arg1);
    }

    public DuplicateCategoryException(String arg0, Throwable arg1, boolean arg2, boolean arg3) {
        super(arg0, arg1, arg2, arg3);
    }

}
